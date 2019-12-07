package com.mycompany.store.web.rest;

import com.mycompany.store.domain.OrderItem;
import com.mycompany.store.service.OrderItemService;
import com.mycompany.store.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.store.domain.OrderItem}.
 */
@RestController
@RequestMapping("/api")
public class OrderItemResource {

    private final Logger log = LoggerFactory.getLogger(OrderItemResource.class);

    private static final String ENTITY_NAME = "orderItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderItemService orderItemService;

    public OrderItemResource(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    /**
     * {@code POST  /order-items} : Create a new orderItem.
     *
     * @param orderItem the orderItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderItem, or with status {@code 400 (Bad Request)} if the orderItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-items")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<OrderItem> createOrderItem(@Valid @RequestBody OrderItem orderItem) throws URISyntaxException {
        log.debug("REST request to save OrderItem : {}", orderItem);
        if (orderItem.getId() != null) {
            throw new BadRequestAlertException("A new orderItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderItem result = orderItemService.save(orderItem);
        return ResponseEntity.created(new URI("/api/order-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-items} : Updates an existing orderItem.
     *
     * @param orderItem the orderItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderItem,
     * or with status {@code 400 (Bad Request)} if the orderItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-items")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<OrderItem> updateOrderItem(@Valid @RequestBody OrderItem orderItem) throws URISyntaxException {
        log.debug("REST request to update OrderItem : {}", orderItem);
        if (orderItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderItem result = orderItemService.save(orderItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /order-items} : get all the orderItems.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderItems in body.
     */
    @GetMapping("/order-items")
    public ResponseEntity<List<OrderItem>> getAllOrderItems(Pageable pageable) {
        log.debug("REST request to get a page of OrderItems");
        Page<OrderItem> page = orderItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /order-items/:id} : get the "id" orderItem.
     *
     * @param id the id of the orderItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-items/{id}")
    public ResponseEntity<OrderItem> getOrderItem(@PathVariable Long id) {
        log.debug("REST request to get OrderItem : {}", id);
        Optional<OrderItem> orderItem = orderItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderItem);
    }

    /**
     * {@code DELETE  /order-items/:id} : delete the "id" orderItem.
     *
     * @param id the id of the orderItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-items/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
        log.debug("REST request to delete OrderItem : {}", id);
        orderItemService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
