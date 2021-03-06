export default {
    render(c) {
        return c(
            this.tag,
            {
                style: this.style
            },
            this.$slots.default
        )
    },
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        xl: String,
        lg: String,
        md: String,
        sm: String,
        xs: String,
        rows: Boolean,
        inline: Boolean,
        gap: [String, Object]
    },
    data() {
        return {
            style: {
                display: 'none'
            },
            resize: this.$resize
        }
    },
    computed: {
        grid_gap() {
            const gap = this.gap || ''
            if (typeof gap == 'object') {
                let { xs, sm, md, lg, xl } = this.gap
                xs = xs || ''
                return {
                    xs: xs,
                    sm: sm || xs,
                    md: md || sm || xs,
                    lg: lg || md || sm || xs,
                    xl: xl || lg || md || sm || xs
                }
            } else {
                return {
                    xs: gap,
                    sm: gap,
                    md: gap,
                    lg: gap,
                    xl: gap
                }
            }
        }
    },
    watch: {
        'resize.sizes'() {
            this._style()
        }
    },
    mounted() {
        this._style()
    },
    methods: {
        _style() {
            const { xs, sm, md, lg, xl, inline, rows, grid_gap } = this
            const style = {
                display: inline ? 'inline-grid' : 'grid'
            }
            const sizes = this.resize.sizes.split(',')
            const template = rows == 'rows' ? `grid-template-rows` : `grid-template-columns`
            if (sizes.includes('xl') && xl) {
                style[template] = xl
                style.gap = grid_gap.xl
            } else if (sizes.includes('lg') && lg) {
                style[template] = lg
                style.gap = grid_gap.lg
            } else if (sizes.includes('md') && md) {
                style[template] = md
                style.gap = grid_gap.md
            } else if (sizes.includes('sm') && sm) {
                style[template] = sm
                style.gap = grid_gap.sm
            } else if (sizes.includes('xs')) {
                style[template] = xs
                style.gap = grid_gap.xs
            } else {
                style[template] = '1fr'
                style.gap = grid_gap.xs
            }
            this.style = style
        }
    }
}
