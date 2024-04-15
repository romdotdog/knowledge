# epimorphism

A [morphism](/math/category-theory/category.md) $f: X \to Y$ is called an
**epimorphism**, an **epi**, or **epic** if for every object $Z$,

$$
\begin{CD}
X @>>f> Y \\
@VVfV @VVg_1V \\
Y @>>g_2> Z
\end{CD}
$$

if this [diagram](/math/category-theory/diagram.md) commutes, then
$g_1 = g_2$.[^1]

## with hom-sets

$f$ is an epimorphism if for every $Z$ there exists an injective function
$\text{Hom}(Y, Z) \rightarrowtail \text{Hom}(X, Z) $.[^1]

[^1]: https://ncatlab.org/nlab/show/epimorphism
