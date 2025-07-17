import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";


const ITEM_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
    id: string;
    status: FilterStatus;
    description: string;
}


async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEM_STORAGE_KEY);
        return storage ? JSON.parse(storage) : [];
    } catch (error) {
        throw new Error("Erro ao obter os itens do armazenamento");
    }
}
async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const items = await get();
    return items.filter(item => item.status === status);
}
async function save(items: ItemStorage[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        throw new Error("Erro ao salvar os itens no armazenamento");
    }
}
async function add(newItem: ItemStorage): Promise<ItemStorage[]>{
    const items = await get();
    const updatedItems = [...items, newItem];
    await save(updatedItems);
    return updatedItems;
}
async function remove(id: string): Promise<void> {
    const items = await get();
    const updatedItems = items.filter(item => item.id !== id);
    await save(updatedItems);
}
async function clearAll(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEM_STORAGE_KEY);
    } catch (error) {
        throw new Error("Erro ao limpar o armazenamento");
    }
}
async function toggleStatus(id: string): Promise<void> {
    const items = await get();
    const updatedItems = items.map(item => {
        if (item.id === id) {
            if (item.status === FilterStatus.PENDING) {
                return { ...item, status: FilterStatus.DONE };
            } else {
                return { ...item, status: FilterStatus.PENDING };
            }
        }
        return item;
    });
    await save(updatedItems);
}
export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clearAll,
    toggleStatus,
}