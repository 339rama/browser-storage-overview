import { useLiveQuery } from "dexie-react-hooks";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { db } from "./db";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { Todo } from "./interfaces";
import styles from './style.module.scss'


const initialValues: Omit<Todo, 'id'> = {
    label: '',
    value: '',
    done: false,
}

const PER_PAGE = 3;


export const IndexedDBStorageTodoList = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const todos = useLiveQuery(
        async () => {
            try {
                const query = db.todos.where('label').startsWithIgnoreCase(search)
                const count = await query.count();
                const items = await query.offset(page * PER_PAGE).limit(PER_PAGE).toArray();
                return { items, count }
            } catch {
                return { items: [], count: 0 }
            }
        },
        [search, page]
    );

    const pagesCount = Math.ceil((todos?.count || 0) / PER_PAGE);

    const addTodo = useCallback(async (createdTodo: Omit<Todo, 'id'>, helpers: FormikHelpers<Omit<Todo, 'id'>>) => {
        await db.todos.add(createdTodo);
        helpers.resetForm({ values: initialValues });
    }, [])

    const deleteTodo: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        await db.todos.delete(Number(e.currentTarget.dataset.id));
    }

    const toggleTodo: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        await db.todos.update(Number(e.currentTarget.dataset.id), { done: !JSON.parse(e.currentTarget.dataset.done!) });
    }


    const onSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(debounce((e) => {
        setSearch(e.target.value)
    }, 500), [])

    const onPrev = () => {
        setPage((prev) => prev - 1)
    }

    const onNext = () => {
        setPage((prev) => prev + 1)
    }

    return <div>
        <Formik initialValues={initialValues} onSubmit={addTodo}>
            {() => (
                <Form className={styles['form']}>
                    <div className={styles['form-group']}>
                        <label>Todo name</label>
                        <Field name='label' />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Todo description</label>
                        <Field name='value' />
                    </div>
                    <button type="submit">Add todo</button>
                </Form>
            )}
        </Formik>
        <div className={styles['form-group']}>
            <label>Search</label>
            <input onChange={onSearch} />
        </div>
        <ul className={styles['list']}>
            {todos?.items.map((todo) => (
                <li key={todo.id} className={styles['list-item']}>
                    <span>{todo.label} {todo.value}</span>
                    <button type='button' data-id={todo.id} data-done={todo.done} onClick={toggleTodo}>{todo.done ? 'Return' : 'Complete'}</button>
                    <button type='button' data-id={todo.id} onClick={deleteTodo}>Delete</button>
                </li>
            ))}
        </ul>
        <div>
            <button type='button' disabled={page === 0} onClick={onPrev}>Prev</button>
            <span>{page + 1}</span>
            <button type='button' disabled={page + 1 === pagesCount} onClick={onNext}>Next</button>
        </div>
    </div>;
};
