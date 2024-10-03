# limit

The **limit** of a [diagram](./diagram.md) $ F\colon \mathcal I \to C $ is an [object](./category.md) $ \underset{\longleftarrow}{\lim}\,F $ or $ \underset{\longleftarrow}{\lim}_{i \in \mathcal I} F(i) $ in $ \mathcal C $ with [morphisms](./category.md) to all objects in the image of $ F $ such that everything commutes.[^1]

## using presheaves

Take the [presheaf](./presheaf.md) $ \operatorname{pt}\colon \mathcal I^{\mathrm{op}} \to \mathrm{Set} $ to be the constant [functor](./functor.md) to the singleton set.

[THE FOLLOWING SECTION IS NOT FINISHED]

We want to construct a presheaf $ \hat{(\underset{\longleftarrow}{\lim}\,F)}\colon \mathcal C^{\mathrm{op}} \to \mathrm{Set} $ [representing](./presheaf.md) $ \underset{\longleftarrow}{\lim}\,F $. That is, it must be isomorphic to $\mathrm{Hom}(-, \underset{\longleftarrow}{\lim}\,F)$.

So we can define the limit as the object represented by that presheaf, but it need not necessarily *exist* in $\mathcal C$

First, define the presheaf of morphisms from $ c $ to the image of $ F $

$$ M(c):\equiv \mathrm{Hom}(c, F(-)) $$

The objects of $M(c)$ are the morphisms from $c$ to $F(i)$ for all $ i \in \mathcal I^{\mathrm{op}} $

The presheaf representing the limit is the functor

$$ \hat{(\underset{\longleftarrow}{\lim}\,F)}(c):\equiv \mathrm{Hom}(\operatorname{pt}, M(c)) $$

This maps to sets of natural transformations from $ \operatorname{pt} $ to the presheaf $\mathrm{Hom}(c, F(-))$


[^1]: https://ncatlab.org/nlab/show/limit