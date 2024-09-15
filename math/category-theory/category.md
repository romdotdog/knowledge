# category

A **category** is[^1][^2]

-   a [type](../type-theory/metatheory/judgement.md) $\mathcal C$, whose
    [terms](../type-theory/metatheory/judgement.md) are called **objects**.
-   for each $X, Y\colon \mathcal C$, a set $\mathrm{Hom}_{\mathcal C}(X, Y)$ whose terms are called
    **morphisms** or **arrows**. If we are working directly inside category
    theory (since, in this presentation, type theory is the metatheory for
    category theory), we can write the meta-theoretical
    $f\colon \mathrm{Hom}_{\mathcal C}(X, Y)$ as $f\colon X \to Y$.
-   for each $X\colon \mathcal C$, a morphism $1_X\colon \mathrm{Hom}_{\mathcal C}(X, X)$, called the
    **identity morphism** (or sometimes just **identity**).
-   For each $X, Y, Z\colon \mathcal C$, a function $$ - \circ -\colon \mathrm{Hom}_{\mathcal C}(Y, Z) \to \mathrm{Hom}_{\mathcal C}(X, Y) \to \mathrm{Hom}_{\mathcal C}(X, Z) $$ called **composition**.
-   _Unitality._ For each $X, Y\colon \mathcal C$ and $f\colon \mathrm{Hom}_{\mathcal C}(X, Y)$, we have
    $$1_Y \circ f = f = f \circ 1_X$$
-   _Associativity._ For each $W, X, Y, Z\colon \mathcal C$ and
    $$f\colon \mathrm{Hom}_{\mathcal C}(W, X),\quad g\colon \mathrm{Hom}_{\mathcal C}(X, Y),\quad h\colon \mathrm{Hom}_{\mathcal C}(Y, Z)$$
    we have $h \circ (g \circ f) = (h \circ g) \circ f$.

[^1]: https://hott.github.io/book/hott-online-13-g2e736d1.pdf "9.1.1"
