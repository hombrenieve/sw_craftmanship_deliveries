package com.hombrenieve.shoppinglist;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class RootController {
    @GetMapping
    public String redirection() {
        return "index.html";
    }
}
