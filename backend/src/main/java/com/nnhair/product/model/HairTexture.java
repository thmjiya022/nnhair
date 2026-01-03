// src/main/java/com/nnhair/product/model/HairTexture.java
package com.nnhair.product.model;

public enum HairTexture {
    STRAIGHT("Straight", "1"),
    BODY_WAVE("Body Wave", "2"),
    DEEP_WAVE("Deep Wave", "3"),
    KINKY_STRAIGHT("Kinky Straight", "4"),
    WATER_WAVE("Water Wave", "5"),
    CURLY("Curly", "6"),
    KINKY_CURLY("Kinky Curly", "7"),
    NATURAL_CURLY("Natural Curly", "8"),
    LOOSE_WAVE("Loose Wave", "9"),
    TIGHT_CURLY("Tight Curly", "10");

    private final String displayName;
    private final String code;

    HairTexture(String displayName, String code) {
        this.displayName = displayName;
        this.code = code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getCode() {
        return code;
    }

    public static HairTexture fromCode(String code) {
        for (HairTexture texture : values()) {
            if (texture.code.equals(code)) {
                return texture;
            }
        }
        return null;
    }
}