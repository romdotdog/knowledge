# associativity

On a set $X$, a binary operation $\cdot: X \times X \to X$ is called
**associative** if for all $a, b, c \in X$,
$a \cdot (b \cdot c) = (a \cdot b)
\cdot c$ holds.[^1]

## in a category

A binary operation on an object $X$ is associative if the following
[diagram](./category-theory/diagram.md) commutes:[^1]

$$
\begin{CD}
X \times X \times X @>> \cdot \times 1 > X \times X \\
@VV 1 \times \cdot V @VV \cdot V \\
X \times X @>> \cdot> X
\end{CD}
$$

[^1]: https://en.wikipedia.org/wiki/Associative_property
