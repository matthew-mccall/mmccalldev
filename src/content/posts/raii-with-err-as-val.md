---
title: "RAII with Errors As Values in C++23"
date: 2025-07-26
---

If you've been around the C++ block, you've probably heard of RAII (Resource Acquisition Is Initialization). 
It's one of those powerful patterns that makes C++ shine when done right.

Imagine you're building a game and need to create windows using SDL. The traditional RAII approach looks something like 
this:

```cpp
class Window {
public:
    Window();
    ~Window();
    // Likely will want to take into account rule of three/five.
private:
    SDL_Window m_window;
};

Window::Window() {
    SDL_CreateWindow(/* ... */);
}

Window::~Window() {
    SDL_DestroyWindow(m_window);
}
```

It's beautiful in its simplicity, isn't it? Create your resource when the object is constructed and clean it up 
automatically when it's destroyed. But there's a wrinkle in this smooth fabric—what happens if `SDL_CreateWindow` 
fails to create our window?

```cpp
Window::Window() {
    m_window = SDL_CreateWindow(/* ... */);
    if (not window)
        throw std::runtime_error { SDL_GetError(); };
}

auto main(int, char**) -> int {
    try {
        Window window;
    } catch (const std::exception&) {
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}
```

Personally, I am not a fan of using exceptions in C++. I sought to take advantage of C++23's `std::expected`. The trick
is to use a private constructor and introduced a static `Create` function.

```cpp
class Window {
public:
    static auto Create() -> std::expected<Window, std::string>;
    ~Window();
    // Likely will want to take into account rule of three/five.
private;
    Window(SDL_Window* window);
    SDL_Window m_window;
};

auto Create() -> std::expected<Window, std::string> {
    SDL_Window* window = SDL_CreateWindow(/* ... */);
    if (not window)
        return std::unexpected { SDL_GetError() };
    return Window { window };
}

Window::Window(SDL_Window* window) 
    : m_window(window) { }

Window::~Window() {
    SDL_DestroyWindow(m_window);
}

auto main(int, char**) -> int {
    auto windowCreateResult = Window::Create();
    if (not windowCreateResult)
        return EXIT_FAILURE;
    Window window = std::move(windowCreateResult).value();
    // Do what you gotta do
    return EXIT_SUCCESS;
}
```

It's elegant, isn't it? We've completely sidestepped exceptions while still clearly communicating when things go wrong. 
The error becomes a first-class citizen in our code—explicit and impossible to ignore. And the best part? We still get 
all the RAII goodness where our window is automatically destroyed when it goes out of scope.

Of course, this is C++, so we need to think about copy and move semantics. In my projects, I've found making these kinds 
of resource-owning classes "move-only" works best—it explicitly communicates that transferring ownership is a 
deliberate operation.

As I continued working with SDL, I realized this pattern was so useful that I wanted to apply it everywhere. So I went 
one step further and created a template class that could wrap any resource with this pattern:

```cpp
template<typename T, auto CreateFunc, auto DestroyFunc>
class RAII_Wrapper {
public:
    template <typename... Args>
    static auto Create(Args... args) -> Result<RAII_Wrapper>
    {
        T* underlying = CreateFunc(std::forward<Args>(args)...);
        if (not underlying)
            return std::unexpected { SDL_GetError() };

        return RAII_Wrapper { underlying };
    }

    RAII_Wrapper(const RAII_Wrapper& other) = delete;

    RAII_Wrapper(RAII_Wrapper&& other) noexcept
        : m_underlying(other.m_underlying)
    {
        other.m_underlying = nullptr;
    }

    auto operator=(const RAII_Wrapper& other) -> RAII_Wrapper& = delete;

    auto operator=(RAII_Wrapper&& other) noexcept -> RAII_Wrapper&
    {
        if (this == &other)
            return *this;
        m_underlying = other.m_underlying;
        other.m_underlying = nullptr;
        return *this;
    }

    [[nodiscard]] auto GetUnderlying() const -> T*
    {
        return m_underlying;
    }

    ~RAII_Wrapper()
    {
        if (m_underlying)
            DestroyFunc(m_underlying);
    }

private:
    explicit RAII_Wrapper(T* underlying) : m_underlying { underlying } {}
    T* m_underlying;
};

using Window = RAII_Wrapper<SDL_Window*, SDL_CreateWindow, SDL_DestroyWindow);
```

This template has been a game-changer in my projects. Instead of writing similar boilerplate code for each resource 
type, I can now focus on the unique aspects of each component while this wrapper handles all the resource lifecycle 
management automatically.

The beauty of this approach is how it combines the best of both worlds—the safety and deterministic cleanup of RAII 
with the explicit error handling of value-based returns. No exceptions flying around invisibly, just clear code paths 
that are easy to follow and reason about.

I wanted to share this pattern because it's made my C++ code so much more maintainable and robust. If you've been 
struggling with the exception vs. no-exception debate in your C++ projects, give this approach a try.