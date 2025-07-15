import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { styles } from "./styles";
import logoImg from "../../assets/logo.png";
import { InputApp } from "@/components/Input";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useState } from "react";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
  { id: "1", status: FilterStatus.DONE, description: "Chocolate" },
  { id: "2", status: FilterStatus.PENDING, description: "Pão" },
  { id: "3", status: FilterStatus.DONE, description: "Leite" },
  { id: "4", status: FilterStatus.PENDING, description: "Ovos" },
  { id: "5", status: FilterStatus.DONE, description: "Queijo" },
  { id: "6", status: FilterStatus.PENDING, description: "Presunto" },
]
export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />
      <View style={styles.form}>
        <InputApp placeholder="O que deseja comprar?" />
        <Button title="Comprar" />
      </View>
      <View style={styles.content}>
        <View style={styles.filterContainer}>
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status} status={status} isActive={filter === status} onPress={() => setFilter(status)} />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log(`Status changed for item ${item.id}`)}
              onRemove={() => console.log(`Item ${item.id} removed`)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />} // Separador de itens
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", padding: 20 }}>
              <Text style={{ color: "#828282" }}>Nenhum item aqui..</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
