import { render, screen } from '@testing-library/react';
import App from '../App';
import Table from '../components/Table';
import Form from '../components/Form';
import { renderWithProviders } from '../utils/utils-for-tests';
import userEvent from '@testing-library/user-event';
import orderSlice, { initialState } from '../store/slices/OrderSlice';

describe('Table Tests', () => {
    test('renders table container', () => {
        renderWithProviders(<Table />);
        const container = screen.getByTestId('table-container');
        expect(container).toBeInTheDocument();
    });
    test('renders table', () => {
        renderWithProviders(<Table />);
        const table = screen.getByTestId('table');
        expect(table).toBeInTheDocument();
    });
    test('renders delete button', () => {
        renderWithProviders(<Table />);
        const button = screen.getByTestId('delete-btn');
        expect(button).toBeInTheDocument();
    });
    test('renders delete-all button', () => {
        renderWithProviders(<Table />);
        const button = screen.getByTestId('delete-all-btn');
        expect(button).toBeInTheDocument();
    });
});

describe('Form Tests', () => {
    test('renders form container', () => {
        renderWithProviders(<Form />);
        const formContainer = screen.getByTestId('form-container');
        expect(formContainer).toBeInTheDocument();
    });
    test('renders form element', () => {
        renderWithProviders(<Form />);
        const form = screen.getByTestId('form');
        expect(form).toBeInTheDocument();
    });
    test('renders form table# input', () => {
        renderWithProviders(<Form />);
        const tableNoInput = screen.getByTestId('tableno-input');
        expect(tableNoInput).toBeInTheDocument;
    });
    test('renders table status input', () => {
        renderWithProviders(<Form />);
        const statusInput = screen.getByTestId('status-input');
        expect(statusInput).toBeInTheDocument();
    });
    test('renders breakfast selection', () => {
        renderWithProviders(<Form />);
        const apperitivesInput = screen.getByTestId('breakfast-selection');
        expect(apperitivesInput).toBeInTheDocument();
    });
    test('renders salads selection', () => {
        renderWithProviders(<Form />);
        const apperitivesInput = screen.getByTestId('salads-selection');
        expect(apperitivesInput).toBeInTheDocument();
    });
    test('renders fishselection', () => {
        renderWithProviders(<Form />);
        const apperitivesInput = screen.getByTestId('fish-selection');
        expect(apperitivesInput).toBeInTheDocument();
    });
    test('renders pork selection', () => {
        renderWithProviders(<Form />);
        const apperitivesInput = screen.getByTestId('pork-selection');
        expect(apperitivesInput).toBeInTheDocument();
    });
    test('renders dessert selection', () => {
        renderWithProviders(<Form />);
        const apperitivesInput = screen.getByTestId('dessert-selection');
        expect(apperitivesInput).toBeInTheDocument();
    });
    test('renders comments input', () => {
        renderWithProviders(<Form />);
        const apperitivesInput = screen.getByTestId('comments-input');
        expect(apperitivesInput).toBeInTheDocument();
    });
});
