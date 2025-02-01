export function getAvatarUrl(file) {
    if (!file) {
        return 'https://imgs.search.brave.com/3i8AgixEol2VuMfgOTZksCaEXrFn6K7bhRm2rla-zPQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzcyMi03/MjIxOTIwX3BsYWNl/aG9sZGVyLXByb2Zp/bGUtaW1hZ2UtcGxh/Y2Vob2xkZXItcG5n/LXRyYW5zcGFyZW50/LXBuZy5wbmc'
    }
    return `https://dgbhaargixuhdrjejxdf.supabase.co/storage/v1/object/sign/avatars/${file}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzAuMzUxMzM0NTEwMzY2Njg4My5qcGciLCJpYXQiOjE3Mzg0MjQ5NzcsImV4cCI6MTc0MTAxNjk3N30._CN_SI4CBrWrgXzzR__EnkKVVih1L-1pd8zVPdUl2HE`
} 