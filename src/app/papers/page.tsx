import {Container} from "react-bootstrap";
import Link from "next/link";

export default function PapersPage() {
    return (<Container>
        <div className={"py-5"}>
            <h1>Academic Papers</h1>
            <p>The following is a list of my published works.</p>
        </div>
        <section>
            <h2>A Device Memory Pool Implementation for Omega h Applications with Kokkos</h2>
            <p>Preliminary work done using the CUDA library for unstructured mesh adaptation in
                Omega_h on NVIDIA GPUs shows a significant performance increase when using a
                memory pool as opposed to traditional memory management strategies. However,
                CUDA is a proprietary library developed by NVIDIA for NVIDIA devices. The use of
                vendor-specific libraries such as CUDA for GPU computing can limit the portability
                and flexibility of applications. As such, this research aims to achieve comparable
                performance gains on AMD and Intel devices using the cross-platform library, Kokkos,
                to implement the memory pool.
            </p>
            <Link href={"/kokkos-mempool.pdf"}>Download PDF</Link>
        </section>
    </Container>)
}