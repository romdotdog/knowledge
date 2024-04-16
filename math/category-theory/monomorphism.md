# monomorphism

A [morphism](./wild-category.md) $f: X \to Y$ is called a **monomorphism**, a
**mono**, or **monic** if for every [object](./wild-category.md) $Z$,

$$
\begin{CD}
Z @>>g_1> X \\
@VVg_2V @VVfV \\
X @>>f> Y
\end{CD}
$$

if this [diagram](./diagram.md) commutes, then $g_1 = g_2$.[^1]

## with hom-sets

$f$ is a monomorphism if for every $Z$, there exists an injective function
$\text{Hom}(Z, X) \rightarrowtail \text{Hom}(Z, Y)$.[^1]

[^1]: https://ncatlab.org/nlab/show/monomorphism
