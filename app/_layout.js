import { Stack } from "expo-router";
export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="components/ForgetPassword"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="components/Login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="components/Register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="components/[missing]"
        options={{
          title: "404",
        }}
      />
      <Stack.Screen
        name="components/ItemDetails"
        options={{
          headerTitle: "More Details",
        }}
      />
      <Stack.Screen
        name="components/UpdateProduct"
        options={{
          title: "Update Product",
        }}
      />
      <Stack.Screen
        name="components/ManageUsers"
        options={{
          title: "Manage Users",
        }}
      />
      <Stack.Screen
        name="components/ManageProducts"
        options={{
          title: "Manage Products",
        }}
      />
      <Stack.Screen
        name="components/NewProduct"
        options={{
          title: "New Products",
        }}
      />
      <Stack.Screen
        name="components/Admin"
        options={{
          headerTitle: "Admin Dashboard",
        }}
      />
    </Stack>
  );
}
