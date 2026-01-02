package com.nnhair.product.model;

public enum ProductCategory {
    FRONTAL_WIGS("Frontal Wigs"),
    CLOSURE_WIGS("Closure Wigs"),
    FULL_LACE_WIGS("Full Lace Wigs"),
    BUNDLES("Bundles"),
    CLOSURES("Closures"),
    FRONTALS("Frontals"),
    ACCESSORIES("Accessories"),
    HEADBAND_WIGS("Headband Wigs"),
    PONYTAILS("Ponytails");

    private final String displayName;

    ProductCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}