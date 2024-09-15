# functor

A **functor** $F$ from a [category](./category.md) $C$ to a category $D$ is a map sending each [object](./wild-category.md) $X: C$ to an object $F(X): D$ and each [morphism](./wild-category.md) $f: X \to Y$ in $C$ to a morphism $F(f): F(X) \to F(Y)$ in $D$, such that

- **$F$ preserves composition**. $F(g \circ f) = F(g) \circ F(f)$
- **$F$ preserves identity**. For all objects $X: C$, $F(1_X) = 1_{F(X)}$[^1]

Note that there is not necessarily a morphism $X \to F(X)$ for any $X: C$.

[^1]: https://ncatlab.org/nlab/show/functor