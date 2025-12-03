import json
from collections import defaultdict

# Caminho do arquivo
INPUT_PATH = 'teste.json'
OUTPUT_PATH = 'teste_updated.json'

# Conjuntos de padrões para remoção de filtros de faixa de preço (sem espaços)
PRICE_PREFIXES = (
    'entre0-50BRL',
    'entre50-250BRL',
    'entre250-500BRL',
    'entre500-1000BRL',
    'acimade500BRL',
)

# Normalizações específicas de coleções e termos
SPECIAL_NORMALIZE = {
    'osreds': 'osreds',
    'osredes': 'osreds',
    'os reds': 'osreds',
    'beachtennis': 'beachtennis',
}

def normalize_filter(value: str) -> str:
    v = value.strip().lower().replace(' ', '')
    # Corrigir termos específicos
    v = SPECIAL_NORMALIZE.get(v, v)
    return v

def is_price_range(value: str) -> bool:
    v = value.lower().replace(' ', '')
    return any(v.startswith(p) for p in PRICE_PREFIXES)

def main():
    with open(INPUT_PATH, 'r', encoding='utf-8') as f:
        products = json.load(f)

    # 1) Normalizar filtros: remover espaços e padronizar; 2) Remover filtros de faixa de preço
    for p in products:
        filters = p.get('filters', [])
        normalized = []
        for flt in filters:
            nf = normalize_filter(flt)
            if is_price_range(nf):
                continue  # remove faixas de preço
            normalized.append(nf)
        p['filters'] = normalized

    # 3) Marcar 6 produtos por coleção (primeiro filtro) que NÃO tenham 'destaque' com isBestSeller = true
    # Coleção é sempre o primeiro filtro
    by_collection = defaultdict(list)
    for idx, p in enumerate(products):
        flts = p.get('filters', [])
        if not flts:
            continue
        collection = flts[0]
        by_collection[collection].append(idx)

    for collection, indices in by_collection.items():
        count = 0
        for i in indices:
            p = products[i]
            flts = p.get('filters', [])
            # Ignora produtos com 'destaque'
            if any(f == 'destaque' for f in flts):
                continue
            # Marca como best seller
            p['isBestSeller'] = True
            count += 1
            if count >= 6:
                break

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    print(f'Atualização concluída. Saída: {OUTPUT_PATH}')

if __name__ == '__main__':
    main()
