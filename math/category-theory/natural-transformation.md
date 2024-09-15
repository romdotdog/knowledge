# natural transformation

A **natural transformation** $\gamma$ between two [functors](./functor.md) $F, G\colon \mathcal C \to \mathcal D$ is a collection of [morphisms](./category.md) in $\mathcal D$ such that for each [object](./category.md) $X\colon \mathcal C$, there is a morphism $\gamma_X\colon F(X) \to G(X)$, called the **component** of $\gamma$ at $X$. These components must satisfy the **naturality condition**, which states that for every morphism $f\colon X \to Y$ in $\mathcal C$, the following diagram commutes:[^1]


$$
\begin{CD}
F(X) @>>F(f)> F(Y) \\
@VV\gamma_X V @VV\gamma_Y V \\
Y @>>G(f)> Z
\end{CD}
$$

This ensures that $\gamma$ is compatible with the structure of the functors $F$ and $G$.

## natural isomorphism

A natural transformation $\gamma$ is called a **natural isomorphism** if each component $\gamma_X$ is an isomorphism in $\mathcal D$, meaning that there exists an inverse morphism $\gamma_X^{-1}\colon G(X) \to F(X)$ for all $X\colon \mathcal C$.[^2]

[^1]: https://en.wikipedia.org/wiki/Natural_transformation
[^2]: https://ncatlab.org/nlab/show/natural%20isomorphism