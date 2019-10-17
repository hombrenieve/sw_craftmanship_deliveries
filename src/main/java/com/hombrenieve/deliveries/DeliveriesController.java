package com.hombrenieve.deliveries;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
public class DeliveriesController {

    private List<Delivery> deliveries = new ArrayList<>();

    @GetMapping("/")
    public String deliveries(Model model) {
        model.addAttribute("deliveries", deliveries);
        return "listDeliveries";
    }

    @PostMapping("/addDelivery")
    public String addDelivery(@RequestParam(name="name") String name, @RequestParam(name="item") List<String> items) {
        Delivery delivery = new Delivery(name, items);
        deliveries.add(delivery);
        return "listDeliveries";
    }
}
