package com.hombrenieve.shoppinglist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shoppinglist")
public class ShoppingListController {

    @Autowired
    private ShoppingListRepository repository;


    @GetMapping
    public List<ShoppingList> getShoppingLists() {
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(code= HttpStatus.CREATED)
    public ShoppingList addShoppingList(@RequestBody ShoppingList shoppingList) {
        return repository.save(shoppingList);
    }

    @PutMapping("{id}")
    public ResponseEntity modifyShoppingList(@PathVariable long id, @RequestBody ShoppingList shoppingList) {
        Optional<ShoppingList> currentList = repository.findById(id);
        if(!currentList.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(repository.save(shoppingList));
    }

    @GetMapping("{id}")
    public ResponseEntity<ShoppingList> getShoppingList(@PathVariable long id) {
        Optional<ShoppingList> saved = repository.findById(id);
        if(!saved.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(saved.get());
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteShoppingList(@PathVariable long id) {
        if(!repository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
