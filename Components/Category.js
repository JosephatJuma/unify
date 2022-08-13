import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SearchBar, Dialog } from "react-native-elements";
export const Category = ({
  categories,
  Loading,
  typing,
  products,
  addtoCart,
  addToItems,
  itemadded,
  added,
  cancel,
  selectFunction,
  search,
}) => {
  const [seraching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDialog, setShowDialog] = useState(true);
  return (
    <>
      <SearchBar
        placeholder="Search for Item..."
        onChangeText={setSearchValue}
        onTextInput={() => setSearching(true)}
        onPressOut={() => search(searchValue)}
        value={searchValue}
        showLoading={seraching}
        containerStyle={{ width: "100%", backgroundColor: "#fff" }}
      />
      {added && (
        <View style={styles.added}>
          <Text style={{ color: "orange", fontSize: 18 }}>
            {itemadded} added to cart
          </Text>
          <FontAwesome
            name="times-circle"
            size={24}
            color="orange"
            onPress={cancel}
          />
        </View>
      )}
      <ScrollView style={styles.cat}>
        <ScrollView style={styles.catSection} horizontal={true}>
          {Loading ? (
            <>
              <Dialog
                isVisible={showDialog}
                onBackdropPress={() => setShowDialog(!showDialog)}
                style={{ backgroundColor: "orange" }}
                containerStyle={{ backgroundColor: "orange" }}
              >
                <Dialog.Title title="Wait a moment, loading products" />

                <Image
                  source={require("../assets/Images/loader.gif")}
                  style={styles.image}
                />
              </Dialog>
            </>
          ) : categories ? (
            categories.map((cat) => {
              return (
                <View key={cat.id}>
                  <Pressable
                    style={styles.catItem}
                    key={cat.id}
                    onPress={() => selectFunction(cat.Name)}
                  >
                    <View style={styles.catTop}>
                      <Text style={styles.catName}>{cat.Name}</Text>
                    </View>
                    <View style={styles.hr}>
                      <Text></Text>
                    </View>
                    <Image
                      source={{ uri: cat.Image }}
                      style={{
                        width: "132%",
                        height: 182,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    />
                  </Pressable>
                </View>
              );
            })
          ) : (
            <Text>No data found</Text>
          )}

          <Text style={styles.itemText}>Item </Text>
        </ScrollView>

        <ScrollView>
          <View style={styles.itemDetails}>
            {
              //products
              products ? (
                products.map((product) => {
                  return (
                    <View style={styles.items} key={product.id}>
                      <View style={styles.item}>
                        {product.image && (
                          <Image
                            source={{ uri: product.image }}
                            style={styles.productImage}
                          />
                        )}
                        <Text style={styles.itemText}> {product.name} </Text>
                        <Text style={styles.itemText}>
                          UGX {product.price}{" "}
                        </Text>
                        <Text style={styles.itemText}>
                          Category: {product.Category}
                        </Text>
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() =>
                            addToItems(product.name, product.price)
                          }
                        >
                          <Ionicons name="cart" size={14} color="white" />
                          <Text style={{ color: "white", alignSelf: "center" }}>
                            add to cart
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.item}>
                        <Image
                          source={{ uri: product.image }}
                          style={styles.productImage}
                        />
                        <Text style={styles.itemText}> {product.name} </Text>
                        <Text style={styles.itemText}>UGX {product.price}</Text>
                        <Text style={styles.itemText}>
                          Category: {product.Category}
                        </Text>
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() =>
                            addToItems(product.name, product.price)
                          }
                        >
                          <Ionicons name="cart" size={14} color="white" />
                          <Text style={{ color: "white" }}>add to cart</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View>
                  <Text>No products Available</Text>
                </View>
              )
            }
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  added: {
    backgroundColor: "black",
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    margin: 10,
  },
  cat: {
    flex: 1,
    backgroundColor: "white",
  },
  catSection: {
    backgroundColor: "white",
    padding: 10,
    //width: "100%",
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  catItem: {
    backgroundColor: "orange",
    margin: 1,
    marginTop: 4,
    marginLeft: 2,
    marginEnd: 2,
    width: 114,
    height: 250,
    borderRadius: 14,
    alignContent: "center",
    alignItems: "center",
    padding: 14,
  },
  catName: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    //fontFamily: "fantasy",
  },
  itemDetails: {
    backgroundColor: "white",
    margin: 5,
    marginTop: 4,
    width: 400,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  catTop: {
    height: "30%",
    backgroundColor: "#075E54",
    width: "130%",
    marginTop: -14,
    borderTopEndRadius: 14,
    borderTopLeftRadius: 14,
  },
  hr: {
    height: 2,
    width: "130%",
    backgroundColor: "white",
  },
  items: {
    width: "105%",
    height: 280,
    display: "flex",
    flexDirection: "row",
  },
  item: {
    backgroundColor: "#075E54",
    width: "45%",
    margin: 10,
    borderRadius: 30,
    padding: 14,
    alignContent: "center",
    alignItems: "center",
  },

  itemText: {
    color: "white",
    fontSize: 14,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "orange",
    width: "60%",
    height: 25,
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    padding: 3,
    justifyContent: "space-around",
  },
  search: {
    width: "80%",
    alignSelf: "center",
    height: 45,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    //position: "absolute",
    borderColor: "orange",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "white",
  },
  searchIcon: {
    backgroundColor: "orange",
    width: "15%",
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginLeft: 20,
  },
});
