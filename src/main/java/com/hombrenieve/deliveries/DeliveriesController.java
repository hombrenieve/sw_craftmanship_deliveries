package com.hombrenieve.deliveries;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/deliveries")
public class DeliveriesController {

    @Autowired
    private DeliveriesRepository repository;


    @GetMapping
    public List<Delivery> listDeliveries() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(code= HttpStatus.CREATED)
    public Delivery addDelivery(@RequestParam(name="name") String name, @RequestParam(name="item") List<String> items) {
        Delivery delivery = new Delivery(name, items);
        return repository.save(delivery);
    }

    @GetMapping("{id}")
    public ResponseEntity<Delivery> showDelivery(@PathVariable long id) {
        Optional<Delivery> saved = repository.findById(id);
        if(!saved.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(saved.get(), HttpStatus.OK);
    }
}
