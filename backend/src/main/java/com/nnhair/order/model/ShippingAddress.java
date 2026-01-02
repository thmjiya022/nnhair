package com.nnhair.order.model;

import com.yahoo.elide.annotation.ComputedAttribute;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddress {

    @Column(name = "STREET_ADDRESS", nullable = false)
    private String streetAddress;

    @Column(name = "CITY", nullable = false)
    private String city;

    @Column(name = "STATE")
    private String state;

    @Column(name = "POSTAL_CODE", nullable = false)
    private String postalCode;

    @Column(name = "COUNTRY")
    private String country = "South Africa";

    @Column(name = "APARTMENT")
    private String apartment;

    @Column(name = "DELIVERY_INSTRUCTIONS", length = 500)
    private String deliveryInstructions;

    @ComputedAttribute
    @Transient
    public String getFullAddress() {
        StringBuilder address = new StringBuilder();
        if (streetAddress != null)
            address.append(streetAddress);
        if (apartment != null)
            address.append(", ").append(apartment);
        if (city != null)
            address.append("\n").append(city);
        if (state != null)
            address.append(", ").append(state);
        if (postalCode != null)
            address.append("\n").append(postalCode);
        if (country != null)
            address.append("\n").append(country);
        return address.toString();
    }

    @ComputedAttribute
    @Transient
    public boolean isComplete() {
        return streetAddress != null && !streetAddress.trim().isEmpty() &&
                city != null && !city.trim().isEmpty() &&
                postalCode != null && !postalCode.trim().isEmpty();
    }
}