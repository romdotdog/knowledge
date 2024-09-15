# yoneda-embedding

The **Yoneda embedding** is a particular [functor](./functor.md) 

$$ よ\colon \mathcal C \to [\mathcal C^{\mathrm{op}}, \mathrm{Set}] $$

from $\mathcal C$ to the [category](./category.md) of [presheaves](./presheaf.md) on $\mathcal C$ defined by

$$ よ(X) = \mathrm{Hom}_{\mathcal{C}}(-,X) $$

[^1]

## as an [adjoint functor](./adjunction.md)

Making use of the [product-hom adjunction](./adjunction.md) (or, equivalently, currying), we know that the Hom functor 

$$ \mathrm{Hom}(-, -)\colon \mathcal C \times \mathcal C^{\mathrm{op}} \to \mathrm{Set} $$

is left-adjoint to the Yoneda embedding.[^1]

[^1]: https://ncatlab.org/nlab/show/Yoneda+lemma
