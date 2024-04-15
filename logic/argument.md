# argument

<!-- prettier-ignore -->
An **argument** is an [implication](/logic/curry-howard.md) from a
[conjunction](/logic/curry-howard.md) of [propositions](/logic/proposition.md) (called **premises**)
to a proposition (called the **conclusion**) $\bigwedge_{i} P_i \to C$.

## strength

In a Heyting algebra, an argument $A$ is said to be **stronger** than an
argument $B$ if there exists $f$ in the following
[diagram](/math/category-theory/diagram.md),

$$
\begin{CD}
\bigwedge_{i} P^A_i @>>f> \bigwedge_{i} P^B_i \\
@VV A V @VV B V\\
C^A @. C^B
\end{CD}
$$

For example, imagine someone arguing that "we shouldn't implement solar panels
because they are too expensive." A stronger form of this argument would be "we
shouldn't implement solar panels because they're too expensive and they require
too much land." The premises of the latter imply the former ("they're too
expensive and they require too much land" implies "they're too expensive").
