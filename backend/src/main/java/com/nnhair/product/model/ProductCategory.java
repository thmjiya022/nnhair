package com.nnhair.product.model;

public enum ProductCategory {
    FRONTAL_WIGS("Frontal Wigs", "wigs-with-frontals"),
    CLOSURE_WIGS("Closure Wigs", "closure-wigs"),
    FULL_LACE_WIGS("Full Lace Wigs", "full-lace-wigs"),
    BUNDLES("Bundles", "hair-bundles"),
    CLOSURES("Closures", "closures"),
    FRONTALS("Frontals", "frontals"),
    ACCESSORIES("Accessories", "accessories"),
    HEADBAND_WIGS("Headband Wigs", "headband-wigs"),
    PONYTAILS("Ponytails", "ponytails"),
    BRAZILIAN_HAIR("Brazilian Hair", "brazilian-hair"),
    PERUVIAN_HAIR("Peruvian Hair", "peruvian-hair"),
    MALAYSIAN_HAIR("Malaysian Hair", "malaysian-hair"),
    CUSTOM_WIGS("Custom Wigs", "custom-wigs");

    private final String displayName;
    private final String slug;

    ProductCategory(String displayName, String slug) {
        this.displayName = displayName;
        this.slug = slug;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getSlug() {
        return slug;
    }

    public static ProductCategory fromSlug(String slug) {
        for (ProductCategory category : values()) {
            if (category.slug.equals(slug)) {
                return category;
            }
        }
        return null;
    }
}