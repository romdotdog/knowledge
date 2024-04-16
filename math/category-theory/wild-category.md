# wild-category

A **wild category** is[^1][^2]

-   a [type](../type-theory/metatheory/judgement.md) $C$, whose
    [terms](../type-theory/metatheory/judgement.md) are called **objects**.
-   for each $X, Y: C$, a type $\text{Hom}_C(X, Y)$ whose terms are called
    **morphisms** or **arrows**. If we are working directly inside category
    theory (since, in this presentation, type theory is the metatheory for
    category theory), we can write the meta-theoretical $f: \text{Hom}_C(X, Y)$
    as $f: X \to Y$.
-   for each $X: C$, a morphism $1_X: \text{Hom}_C(X, X)$, called the **identity
    morphism**.
-   For each $X, Y, Z: C$, a function $$ - \circ -: \text{Hom}\_C(Y, Z) \to
    \text{Hom}\_C(X, Y) \to \text{Hom}\_C(X, Z) $$ called **composition**.
-   _Unitality._ For each $X, Y: C$ and $f: \text{Hom}_C(X, Y)$, we have
    $$1_Y \circ f = f = f \circ 1_X$$
-   _Associativity._ For each $W, X, Y, Z: C$ and
    $$f: \text{Hom}_C(W, X),\quad g: \text{Hom}_C(X, Y),\quad h: \text{Hom}_C(Y, Z)$$
    we have $h \circ (g \circ f) = (h \circ g) \circ f$.

[^1]: https://hott.github.io/book/hott-online-13-g2e736d1.pdf "9.1.1"
[^2]: https://ncatlab.org/nlab/show/wild+category
