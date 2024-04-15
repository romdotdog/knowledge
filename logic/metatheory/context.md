# context

<!-- prettier-ignore -->
A **context** is a finite list of bound variables $x_1: E_1,\ \ldots,\  x_n: E_n$ where each $E_n \equiv T_n(x_1,\ \ldots,\ x_{n-1})$[^1]

<!-- prettier-ignore -->
A context is **well-formed** if for all $i \in \{1,\ \ldots,\ n\}$, we can derive
$x_1: E_1,\ \ldots,\  x_{i-1}: E_{i-1} \vdash x_i: E_i$[^1]

Assume a context is well-formed unless stated otherwise.

[^1]: https://arxiv.org/pdf/2212.11082.pdf "1.1"
