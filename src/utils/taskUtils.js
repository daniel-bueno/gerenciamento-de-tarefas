export const STATUS_LABELS = {
    pending: 'Pendente',
    in_progress: 'Em Andamento',
    completed: 'Concluído'
}

export const getStatusLabel = (status) => {
    return STATUS_LABELS[status] || status
}

export const STATUS_OPTIONS = [
    { value: 'pending', label: STATUS_LABELS.pending },
    { value: 'in_progress', label: STATUS_LABELS.in_progress },
    { value: 'completed', label: STATUS_LABELS.completed }
]