# curry-howard

The **Curry-Howard correspondence** refers to the relationship between
first-order logic and type theory.

## traditional logic

Where $A$ and $B$ are propositions,

**Verum** ($\top$) is the $1$ type.[^1] [^2]

**Falsum** ($\bot$) is the $0$ type.[^1] [^3]

**Conjunction** ($A \wedge B$) is the product $A \times B$.[^1]

**Disjunction** ($A \vee B$) is the propositional truncation of the coproduct $
\left\| A + B \right\| $.[^1]

**Implication** ($A \implies B$) is the function type $A \to B$.[^1]

**Negation** ($\neg A$) is the function type $A \to 0$.[^1]

**Biconditional** ($A \iff B$) is the identity type $A = B$.[^1]

Where $P(x)$ is a family of propositions,

<!-- prettier-ignore -->
**Universal quantification** ($\forall (x: A).\,P(x)$) is the dependent
product $\prod_{x: A} P(x)$.[^1]

<!-- prettier-ignore -->
**Existential quantification** ($\exists (x: A).\,P(x)$) 
is the propositional truncation of the dependent coproduct
$\left\| \sum_{x: A} P(x) \right\|$.[^1]

[^1]: https://homotopytypetheory.org/book "3.7.1"
[^2]: https://en.wikipedia.org/wiki/Tee_(symbol)
[^3]: https://en.wikipedia.org/wiki/Up_tack
