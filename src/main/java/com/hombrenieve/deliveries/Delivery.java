package com.hombrenieve.deliveries;

import java.util.List;

public class Delivery {
    private String name;
    private List<String> products;

    Delivery(String name, List<String> products) {
        this.name = name;
        this.products = products;
    }

    public String getName() {
        return name;
    }

    public List<String> getProducts() {
        return products;
    }
}
