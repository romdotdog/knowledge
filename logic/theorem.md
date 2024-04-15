# theorem

A **theorem** $T$ is an [inhabited](/logic/judgement.md)
[proposition](/logic/proposition.md).[^1] This means that there is a
[term](/logic/judgement.md) $p: T$ (also called a "witness" or "proof") of the
theorem. All theorems are isomorphic to [verum](/logic/curry-howard.md).

<!-- prettier-ignore -->
For example, let [type](/logic/judgement.md) $T_{\text{Py}}$ be the type of proofs that $a^2 + b^2 = c^2$ 
where $a$ and $b$ are legs of a right triangle, and $c$ is its
hypotenuse. The propositional truncation $\left\| T_{\text{Py}} \right\|$ has
only one proof if and only if there is a proof of $T_{\text{Py}}$. Wikipedia says
there are more than 370 proofs of the Pythagorean equation, so
$\left\| T_{\text{Py}} \right\|$ is a theorem.[^2]

[^1]: https://hott.github.io/book/hott-online-13-g2e736d1.pdf
[^2]: https://en.wikipedia.org/wiki/Pythagorean_theorem
