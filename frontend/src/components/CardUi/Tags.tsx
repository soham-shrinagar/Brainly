interface TagsProps{
    tagTypes: "Productivity" | "Education" | "Entairtainment" | "Mindset" | "Workflow" | "Inspiration"
}

const Tags = (props: TagsProps) => {
    return <div className="px-3 py-1 text-lg bg-blue-100 rounded-2xl text-blue-500">
        #{props.tagTypes}
    </div>
}

export default Tags;