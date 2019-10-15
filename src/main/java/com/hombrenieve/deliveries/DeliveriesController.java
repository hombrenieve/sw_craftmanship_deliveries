package com.hombrenieve.deliveries;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class DeliveriesController {

    @GetMapping("/")
    public String deliveries(Model model) {
        return "DeliveriesFrontPage";
    }

    @PostMapping("/addDelivery")
    public String addDelivery(Model model) {
        return "DeliveriesFrontPage";
    }
}
