"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), title: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
    setEditingId(null);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === "Enter") {
      updateTodoTitle(id, e.currentTarget.value);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newTitle = e.target.value;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const currentTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <Tabs defaultValue="current" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="current">Current Todos</TabsTrigger>
        <TabsTrigger value="completed">Completed Todos</TabsTrigger>
      </TabsList>
      <TabsContent value="current">
        <Card>
          <CardHeader>
            <CardTitle>Current Todos</CardTitle>
            <CardDescription>
              Add new todos or mark them as complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder="Add a new todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <Button onClick={addTodo}>Add</Button>
            </div>
            <ul className="space-y-2">
              {currentTodos.map((todo) => (
                <li key={todo.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  {editingId === todo.id ? (
                    <Input
                      value={todo.title}
                      onChange={(e) => handleInputChange(e, todo.id)}
                      onBlur={() => setEditingId(null)}
                      onKeyPress={(e) => handleKeyPress(e, todo.id)}
                      className="flex-grow"
                    />
                  ) : (
                    <Label
                      htmlFor={`todo-${todo.id}`}
                      onClick={() => setEditingId(todo.id)}
                      className="flex-grow cursor-pointer"
                    >
                      {todo.title}
                    </Label>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="completed">
        <Card>
          <CardHeader>
            <CardTitle>Completed Todos</CardTitle>
            <CardDescription>
              View or delete your completed todos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="space-y-2">
              {completedTodos.map((todo) => (
                <li key={todo.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`completed-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  {editingId === todo.id ? (
                    <Input
                      value={todo.title}
                      onChange={(e) => handleInputChange(e, todo.id)}
                      onBlur={() => setEditingId(null)}
                      onKeyPress={(e) => handleKeyPress(e, todo.id)}
                      className="flex-grow"
                    />
                  ) : (
                    <Label
                      htmlFor={`completed-${todo.id}`}
                      onClick={() => setEditingId(todo.id)}
                      className="flex-grow cursor-pointer line-through"
                    >
                      {todo.title}
                    </Label>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
