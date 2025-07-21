import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import logoImg from "../../assets/logo.png";
import { InputApp } from "@/components/Input";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useEffect, useState } from "react";
import { ItemStorage, itemsStorage } from "@/storage/itemStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAdd() {
    if (!description.trim()) {
      Alert.alert("Atenção", "Por favor, insira uma descrição para o item.");
      return;
    }
    const newItem: ItemStorage = {
      id: String(new Date().getTime()), // Gerando um ID único baseado no timestamp
      status: FilterStatus.PENDING,
      description,
    };
    await itemsStorage.add(newItem);
    await itemsByStatus();
    setDescription(""); // Limpa o campo de entrada após adicionar o item
  }
  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os itens.");
    }
  }
  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  }

  function clearAllItems() {
    if (items.length === 0) {
      Alert.alert("Atenção", "Não há itens para limpar.");
      return;
    }
    Alert.alert("Atenção", "Tem certeza que deseja limpar todos os itens?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Limpar",
        onPress: async () => {
          await itemsStorage.clearAll();
          await itemsByStatus();
        },
      },
    ]);
  }
  async function toggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível alterar o status dos itens.");
    }
  }
  useEffect(() => {
    itemsByStatus();
  }, [filter]);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />
      <View style={styles.form}>
        <InputApp
          placeholder="O que deseja comprar?"
          onChangeText={setDescription}
          value={description}
          autoCorrect={false}
        />
        <Button title="Comprar" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.filterContainer}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={filter === status}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={clearAllItems}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => toggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
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
