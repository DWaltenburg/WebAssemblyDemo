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
 (func $fib_optimized_i32 (param $n i32) (result i32)
    (local $a i32)
    (local $b i32)
    (local $c i32)
    (local.set $a (i32.const 0))
    (local.set $b (i32.const 1))
    (local.set $c (i32.const 0))
    (if 
      (i32.lt_s (local.get $n) (i32.const 2)) ;; if n < 2, return n
        (then
            (return (local.get $n))
        )
    )
    (loop $loop
      (if 
        (i32.eq (local.get $n) (i32.const 0))
          (then
            (return (local.get $a))
          )
      )
      (if 
        (i32.eq (local.get $n) (i32.const 1))
          (then
            (return (local.get $b))
          )
      )
      (local.set $c (i32.add (local.get $a) (local.get $b)))
      (local.set $a (local.get $b))
      (local.set $b (local.get $c))
      (local.set $n (i32.sub (local.get $n) (i32.const 1)))
      (br $loop)
    )
    (unreachable) ;; should never reach here. This is just to satisfy the compiler

 )
  (export "fib_o_i32"(func $fib_optimized_i32))
 (func $fib_optimized_i64 (param $n i64) (result i64)
    (local $a i64)
    (local $b i64)
    (local $c i64)
    (local.set $a (i64.const 0))
    (local.set $b (i64.const 1))
    (local.set $c (i64.const 0))
    (if 
      (i64.lt_s (local.get $n) (i64.const 2)) ;; if n < 2, return n
        (then
            (return (local.get $n))
        )
    )
    (loop $loop
      (if 
        (i64.eq (local.get $n) (i64.const 0))
          (then
            (return (local.get $a))
          )
      )
      (if 
        (i64.eq (local.get $n) (i64.const 1))
          (then
            (return (local.get $b))
          )
      )
      (local.set $c (i64.add (local.get $a) (local.get $b)))
      (local.set $a (local.get $b))
      (local.set $b (local.get $c))
      (local.set $n (i64.sub (local.get $n) (i64.const 1)))
      (br $loop)
    )
    (unreachable) ;; should never reach here. This is just to satisfy the compiler

 )
  (export "fib_o_i64"(func $fib_optimized_i64))


)