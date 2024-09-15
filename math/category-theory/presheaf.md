# presheaf

A **presheaf** on a small [category](./category.md) $\mathcal C$ is a [functor](./functor.md) from the [opposite category](./opposite-category.md) $\mathcal C^\mathrm{op}$ to $\mathrm{Set}$.[^1]

More generally, an $\mathcal S$**-valued presheaf** is a functor from $\mathcal C^\mathrm{op}$ to $\mathcal S$.[^1]

## representable presheaves

A presheaf is **representable** if it is [naturally isomorphic](./natural-transformation.md) to the [Yoneda embedding](./yoneda-embedding.md) $よ(X)$ (or, alternatively, the Hom functor $\mathrm{Hom}(-, X)$) on some [object](./category.md) $ X $ of $\mathcal C$ [^2] [^3]

[^1]: https://ncatlab.org/nlab/show/presheaf
[^2]: https://ncatlab.org/nlab/show/representable+functor
[^3]: https://en.wikipedia.org/wiki/Representable_functor