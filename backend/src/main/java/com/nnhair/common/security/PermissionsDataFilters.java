package com.nnhair.common.security;

public class PermissionsDataFilters {
    public static final String READ_DATA_FILTERS = "Principal is Authenticated";
    public static final String READ_OWN_ORDERS_FILTER = "Principal is Owner OR Principal is Admin";
    public static final String READ_ALL_PRODUCTS_FILTER = "Principal is Authenticated";
}
