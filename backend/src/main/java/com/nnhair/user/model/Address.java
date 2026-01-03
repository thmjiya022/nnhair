package com.nnhair.user.model;

import com.yahoo.elide.annotation.ComputedAttribute;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Column(name = "STREET_ADDRESS", length = 255)
    private String streetAddress;

    @Column(name = "CITY", length = 100)
    private String city;

    @Column(name = "STATE", length = 100)
    private String state;

    @Column(name = "POSTAL_CODE", length = 20)
    private String postalCode;

    @Column(name = "COUNTRY", length = 100)
    private String country = "South Africa";

    @Column(name = "IS_DEFAULT")
    private Boolean isDefault = false;

    @ComputedAttribute
    @Transient
    public String getFormattedAddress() {
        StringBuilder address = new StringBuilder();
        if (streetAddress != null && !streetAddress.isEmpty()) {
            address.append(streetAddress);
        }
        if (city != null && !city.isEmpty()) {
            address.append("\n").append(city);
        }
        if (state != null && !state.isEmpty()) {
            address.append(", ").append(state);
        }
        if (postalCode != null && !postalCode.isEmpty()) {
            address.append("\n").append(postalCode);
        }
        if (country != null && !country.isEmpty()) {
            address.append("\n").append(country);
        }
        return address.toString();
    }

    @ComputedAttribute
    @Transient
    public boolean isComplete() {
        return streetAddress != null && !streetAddress.trim().isEmpty() &&
                city != null && !city.trim().isEmpty() &&
                postalCode != null && !postalCode.trim().isEmpty() &&
                country != null && !country.trim().isEmpty();
    }
}