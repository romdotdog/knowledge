# monomorphism

A [morphism](/math/category-theory/category.md) $ f: X \to Y $ is called a
**monomorphism**, a **mono**, or **monic** if for every object $ Z $,

$$
\begin{CD}
Z @>>g_1> X \\
@VVg_2V @VVfV \\
X @>>f> Y
\end{CD}
$$

if this [diagram](/math/category-theory/diagram.md) commutes, then $ g_1 = g_2
$.[1]

## with hom-sets

$ f $ is a monomorphism if for every $ Z $ and $ a: Z \to X $, there exists an
injective function $ \operatorname{Hom}(Z, X) \rightarrowtail
\operatorname{Hom}(Z, Y) $.[1]

[1]: https://ncatlab.org/nlab/show/monomorphism