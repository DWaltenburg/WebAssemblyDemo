;; a module that calculates and returns the i'th Fibonacci number
(module
 (func $fib (param $n i32) (result i32)
    (if 
      (i32.lt_s (local.get $n) (i32.const 2)) ;; if n < 2, return n
        (then
            (return (local.get $n))
        )
    )
    (return ;; return fib(n-2) + fib(n-1)
      (i32.add 
        (call $fib (i32.sub (local.get $n) (i32.const 2)))
        (call $fib (i32.sub (local.get $n) (i32.const 1)))
      )
    )
 )
 (export "fib"(func $fib))
)