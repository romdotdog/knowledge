# yoneda-lemma

The **Yoneda lemma** states that for any [presheaf](./presheaf.md) $F\colon \mathcal C^{\mathrm{op}} \to \mathrm{Set}$, there is an isomorphism

$$ \mathrm{Hom}(よ(X), F) \;\simeq\; F(X) $$

between the set of [natural transformations](./natural-transformation.md) from the presheaf [*represented*](./presheaf.md) by $X$ to the presheaf $F$ and the set $F(X)$.[^1]

## informally

For any object $ Y\colon \mathcal C $, if you have a natural transformation

$$ \gamma_X\colon \mathrm{Hom}(X, Y) \to F(X) $$

$\gamma$ will bijectively correspond with an object in $F(Y)$

*Remark.* Remember that if $f\colon X \to Y$, then $F(f)\colon F(Y) \to F(X)$


[^1]: https://ncatlab.org/nlab/show/Yoneda+lemma