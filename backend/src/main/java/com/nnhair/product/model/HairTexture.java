package com.nnhair.product.model;

public enum HairTexture {
    STRAIGHT("Straight"),
    BODY_WAVE("Body Wave"),
    DEEP_WAVE("Deep Wave"),
    KINKY_STRAIGHT("Kinky Straight"),
    WATER_WAVE("Water Wave"),
    CURLY("Curly"),
    KINKY_CURLY("Kinky Curly"),
    NATURAL_CURLY("Natural Curly");

    private final String displayName;

    HairTexture(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}