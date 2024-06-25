(module ;; define a module
    (func (param $lhs i32) (param $rhs i32) (result i32) ;; define a function with two parameters and a result of type i32
        local.get $lhs ;; add the first parameter to the stack
        local.get $rhs ;; add the second parameter to the stack
        i32.add)) ;; perform the addition on the two top values on the stack (the two parameters)