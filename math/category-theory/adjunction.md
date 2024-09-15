# adjunction

An **adjunction** (or **adjoint functors**) is a particular interaction (written
$ F \dashv G $) between a [functor](./functor.md) $F$ called the **left
adjoint** and a functor $G$ called the **right adjoint**.

## intuition

An adjunction is a kind of "inverses over an arrow" where if you have a
[morphism](./category.md) $F(X) \to Y$, you can get a morphism $X \to G(Y)$ and
vice versa.

## product-hom adjunction

A canonical example of this corresponds to currying in computer science. For any
Y, set $F$ to the product functor $ - \times Y $ and $G$ to the hom functor $
\mathrm{Hom}(Y, -) $. Then we have the **product-hom adjunction** $ F \dashv G
$, corresponding to

$$ F(X) \to Z \cong X \to G(Z) $$

$$ X \times Y \to Z \cong X \to \mathrm{Hom}(Y, Z) $$

Or, more informally,

$$ X \times Y \to Z \cong X \to Y \to Z $$
