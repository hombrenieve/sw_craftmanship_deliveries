package com.hombrenieve.deliveries;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class DeliveriesController {

    @GetMapping("/")
    public String deliveries(Model model) {
        return "DeliveriesFrontPage";
    }

    @PostMapping("/addDelivery")
    public String addDelivery(Model model, @RequestParam Map<String,String> params) {
        System.out.println(params.size());
        return "DeliveriesFrontPage";
    }
}
