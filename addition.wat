(module ;; define a module
    (func (param $lhs i32) (param $rhs i32) (result i32) ;; define a function with two parameters and a result of type i32
        local.get $lhs ;; add the first parameter to the stack
        local.get $rhs ;; add the second parameter to the stack
        i32.add)) ;; perform the addition on the two top values on the stack (the two parameters). The result is pushed back onto the stack
;; i32.add is a WebAssembly instruction that adds the two top values on the stack and pushes the result back onto the stack.
;; The result of the function is the top value on the stack. In this case, the result of the addition.