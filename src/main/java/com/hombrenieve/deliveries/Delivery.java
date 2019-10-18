package com.hombrenieve.deliveries;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> products;

    public Delivery() {
    }

    public Delivery(String name, List<String> products) {
        this.name = name;
        this.products = new ArrayList<>();
        for(String product: products) {
            this.products.add(new Product(product));
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public String getName() {
        return name;
    }

    public List<Product> getProducts() {
        return products;
    }
}
