# functor

A **functor** $F$ from a [category](./category.md) $\mathcal C$ to a category $\mathcal D$ is a
map sending each [object](./category.md) $X\colon \mathcal C$ to an object $F(X)\colon \mathcal D$ and
each [morphism](./category.md) $f\colon X \to Y$ in $\mathcal C$ to a morphism
$F(f)\colon F(X) \to F(Y)$ in $\mathcal D$, such that

-   **$F$ preserves composition**. $F(g \circ f) = F(g) \circ F(f)$
-   **$F$ preserves identity**. For all objects $X\colon \mathcal C$, $F(1_X) = 1_{F(X)}$[^1]

Note that there is not necessarily a morphism $X \to F(X)$ for any $X\colon \mathcal C$.

## covariance and contravariance

A **contravariant functor** $F\colon \mathcal C \to \mathcal D$ is a (covariant) functor from the
[opposite category](./opposite-category.md) $\mathcal C^\mathrm{op}$ to $\mathcal D$.[^2]

A **covariant functor** is just a regular, non-contravariant functor.[^2]

## full functors and faithful functors

A functor is called **full** if the function

$$ \mathrm{fmap}\colon \mathrm{Hom}(X,Y) \to \mathrm{Hom}(F(X), F(Y)) $$

is surjective.[^3]

A functor is called **faithful** if $\mathrm{fmap}$ is injective.

Logically, a functor is called **full and faithful** if $\mathrm{fmap}$ is
bijective.

[^1]: https://ncatlab.org/nlab/show/functor
[^2]: https://ncatlab.org/nlab/show/contravariant+functor
[^3]: https://ncatlab.org/nlab/show/full+functor
