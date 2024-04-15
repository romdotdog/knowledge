# unitality

On a set $X$, a binary operation $\cdot: X \times X \to X$ is called **unital**
if there exists $1 \in X$ such that $1 \cdot x = x = x \cdot 1$ for all
$x \in X$.[^1]

## in a category

The binary operation on a generic object $X$ is unital if the following (unitor)
[diagram](/math/category-theory/diagram.md) commutes:[^2]

$$
\begin{CD}
X \times 1 @>> (1_X, e) > X \times X @<< (e, 1_X) < 1 \times X\\
@VV p_1 V @VV \cdot V @VV p_2 V \\
S @= S @= S
\end{CD}
$$

[^1]: https://ncatlab.org/nlab/show/identity+element
[^2]: https://en.wikipedia.org/wiki/Monoid_(category_theory)
